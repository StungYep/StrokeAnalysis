import analysis.Common.Constants
import org.apache.spark.sql.SparkSession
import org.junit.Test

import java.io.{File, PrintWriter}
import scala.io.Source
import scala.reflect.io.Path.jfile2path

class FunUT {

  val spark: SparkSession = SparkSession
    .builder()
    .appName("PredUX")
    .config("spark.master", "local[*]")
    .config("mapreduce.fileoutputcommitter.marksuccessfuljobs", "false")
    .config("parquet.enable.summary-metadata", "false")
    .getOrCreate()

  @Test
  def testNewFile(): Unit = {
    import spark.implicits._

    val basePath = Constants.basePath
    val path = basePath + "/" + "temp"

    val realBasePath = Constants.basePath
    val realPath = basePath + "/" + "real" + Constants.loadSuffix
    val file = new File(realPath)
    file.createFile()

    val df = Seq(1, 2, 3, 4).toDF("x")
    df.repartition(1).write.option("compression", "none").mode("overwrite").json(path)


    val writer = new PrintWriter(file)
    val fileNames = new java.io.File(path).listFiles.filter(_.getName.startsWith("part-00000")).map(_.getPath).toSeq

    fileNames.foreach(x => println(x))

    val lines = Source.fromFile(fileNames(0)).getLines().toList
    val jsonStr = "[" + lines.mkString(",") + "]"
    writer.write(jsonStr)

    writer.close()
  }

  @Test
  def createFile(): Unit = {
    val df = spark.read.format("json").load("/Users/stungyep/Desktop/Scalas/SparkDFE/src/main/resources/output/ageInsights.json")
    df.show(false)

  }

}
