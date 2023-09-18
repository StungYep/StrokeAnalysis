package analysis

import analysis.Common.Constants
import analysis.Load.LoadUtil
import analysis.trans.{SqlProcessor, TransProcessor}
import org.apache.spark.sql.{DataFrame, SparkSession}

import java.util.Properties

object Main {

  val properties = new Properties()
  properties.put("user", Constants.user)
  properties.put("password", Constants.psd)

  def main(arg: Array[String]): Unit = {

    val spark: SparkSession = SparkSession
      .builder()
      .appName("PredUX")
      .config("spark.master", "local[*]")
      .getOrCreate()

    val df = spark
      .read
      .format("csv")
      .option("header", value = true)
      .load("/Users/stungyep/Data/DataSet/Pred.csv")

    SqlProcessor.initSql(properties)

    df.persist()
    calToGetInsights(spark, df)
    df.unpersist()

    spark.close()
  }


  private def calToGetInsights(spark: SparkSession, source: DataFrame): Unit = {
    // Transform Age
    val ageInsightsDF = TransProcessor.calcAgeRelationship(spark, source).coalesce(1)
    //LoadUtil.loadInsights(spark, ageInsightsDF, Constants.ageInsightsFileName)
    LoadUtil.loadToDB(spark, ageInsightsDF, properties, Constants.ageInsightsFileName)

    // Transform Hypertension
    val hyperInsightsDF = TransProcessor.calcHypertension(spark, source).coalesce(1)
    //LoadUtil.loadInsights(spark, hyperInsightsDF, Constants.hyperInsightsFileName)
    LoadUtil.loadToDB(spark, hyperInsightsDF, properties, Constants.hyperInsightsFileName)

    // Transform Cardiopathy
    val cardInsightsDF = TransProcessor.calcCardiopathy(spark, source).coalesce(1)
    //LoadUtil.loadInsights(spark, cardInsightsDF, Constants.cardioInsightsFileName)
    LoadUtil.loadToDB(spark, cardInsightsDF, properties, Constants.cardioInsightsFileName)

    // Transform BloodGlucose
    val bloodInsightsDF = TransProcessor.calcBloodGlucose(spark, source).coalesce(1)
    //LoadUtil.loadInsights(spark, bloodInsightsDF, Constants.bloodInsightsFileName)
    LoadUtil.loadToDB(spark, bloodInsightsDF, properties, Constants.bloodInsightsFileName)

    // Transform Bmi
    val bmiInsightsDF = TransProcessor.calcBmi(spark, source).coalesce(1)
    //LoadUtil.loadInsights(spark, bmiInsightsDF, Constants.bmiInsightsFileName)
    LoadUtil.loadToDB(spark, bmiInsightsDF, properties, Constants.bmiInsightsFileName)

    // Transform Smoking
    val smokingInsightsDF = TransProcessor.calcSmoking(spark, source).repartition(1)
    //LoadUtil.loadInsights(spark, smokingInsightsDF, Constants.smokingInsightsFileName)
    LoadUtil.loadToDB(spark, smokingInsightsDF, properties, Constants.smokingInsightsFileName)
  }

}
