package analysis.trans

import org.apache.spark.sql.functions.{count, lit, sum}
import org.apache.spark.sql.{DataFrame, SparkSession}
import shapeless.syntax.typeable.typeableOps

object TransProcessor {

  def calcAgeRelationship(spark: SparkSession, source: DataFrame): DataFrame = {
    import spark.implicits._

    val res = source
      //.filter($"isStroke" === lit("1"))
      .groupBy($"age", $"isStroke")
      .agg(
        sum(lit("1")).as("count")
      )
      .withColumn("age", $"age".cast("int"))
      .orderBy($"age".asc)

    res
  }


  def calcHypertension(spark: SparkSession, source: DataFrame): DataFrame = {
    import spark.implicits._

    source
      .groupBy($"isStroke", $"isHypertension")
      .agg(
        sum(lit("1")).as("count")
      )
  }

  def calcCardiopathy(spark: SparkSession, source: DataFrame): DataFrame = {
    import spark.implicits._

    source
      .groupBy($"isStroke", $"isCardiopathy")
      .agg(
        sum(lit("1")).as("count")
      )
  }

  def calcBloodGlucose(spark: SparkSession, source: DataFrame): DataFrame = {
    import spark.implicits._

    source
      .groupBy($"isStroke", $"avgBloodGlucose")
      .agg(
        sum(lit("1")).as("count")
      )
      .withColumn("avgBloodGlucose", $"avgBloodGlucose".cast("decimal"))
      .orderBy($"avgBloodGlucose".asc)
  }


  def calcBmi(spark: SparkSession, source: DataFrame): DataFrame = {
    import spark.implicits._

    source
      .groupBy($"isStroke", $"bmiFlag")
      .agg(
        sum(lit("1")).as("count")
      )
      .withColumn("bmiFlag", $"bmiFlag".cast("decimal"))
      .orderBy($"bmiFlag".asc)
  }

  def calcSmoking(spark: SparkSession, source: DataFrame): DataFrame = {
    import spark.implicits._

    source
      .groupBy($"isStroke", $"isSmoking")
      .agg(
        sum(lit("1")).as("count")
      )
  }

}
