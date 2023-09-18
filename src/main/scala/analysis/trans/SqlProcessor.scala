package analysis.trans

import analysis.Common.Constants

import java.sql.DriverManager
import java.util.Properties
import scala.io.Source

object SqlProcessor {

  def initSql(properties: Properties): Unit = {
    val url = Constants.jdbcURL

    val sql = Source.fromFile("/Users/stungyep/Desktop/Scalas/SparkDFE/src/main/scala/analysis/model/init.sql").mkString

    val connection = DriverManager.getConnection(url, properties)
    val statement = connection.createStatement()

    val sqlStatements = sql.split(";")

    for (sqlStatement <- sqlStatements) {
      if (sqlStatement.trim().nonEmpty) {
        statement.executeUpdate(sqlStatement)
      }
    }
  }

}
