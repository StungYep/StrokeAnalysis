package analysis.Load

import analysis.Common.Constants
import org.apache.spark.sql.{DataFrame, SaveMode, SparkSession}

import java.io._
import java.util.Properties
import scala.io.Source

object LoadUtil {

  def loadInsights(spark: SparkSession, res: DataFrame, fileName: String): Unit = {
    val basePath = Constants.basePath
    val path = basePath + "/" + fileName + Constants.loadSuffix

    val file = new File(path)
    if (!file.exists()) {
      file.createNewFile()
    }
    else {
      file.delete()
      file.createNewFile()
    }

    val tempPath = Constants.basePath + "/temp" + fileName + Constants.loadSuffix
    writeToTempFolder(spark, res, tempPath)
    unifyFormat(file, path, tempPath)

  }

  def writeToTempFolder(spark: SparkSession, res: DataFrame, path: String): Unit = {
    res
      .write
      .format(Constants.fileLoadFormat)
      .mode("overwrite")
      .save(path)
  }

  def unifyFormat(file: File, readPath:String, tempPath: String): Unit = {
    val writer = new PrintWriter(file)
    val fileNames = new java.io.File(tempPath).listFiles.filter(_.getName.startsWith("part-00000")).map(_.getPath).toSeq

    val lines = Source.fromFile(fileNames(0)).getLines().toList
    val jsonStr = "[" + lines.mkString(",") + "]"
    writer.write(jsonStr)

    writer.close()
  }


  def loadToDB(spark: SparkSession, res: DataFrame, properties: Properties, table: String): Unit = {
    val tableName: String = Constants.dbName + "." + table

    res
      .write
      .mode(SaveMode.Append.toString)
      .jdbc(Constants.jdbcURL, tableName, properties)
  }
}
