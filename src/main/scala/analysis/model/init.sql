DROP TABLE sys.AgeInsights;
CREATE TABLE IF NOT EXISTS sys.AgeInsights (
    age INT NULL,
    isStroke varchar(32) NULL,
    count INT NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;



DROP TABLE sys.BloodInsights;
CREATE TABLE IF NOT EXISTS sys.BloodInsights (
    isStroke varchar(32) NULL,
    avgBloodGlucose DECIMAL NULL,
    count INT NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;



DROP TABLE sys.BmiInsights;
CREATE TABLE IF NOT EXISTS sys.BmiInsights (
    isStroke varchar(32) NULL,
    bmiFlag DECIMAL NULL,
    count INT NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;



DROP TABLE sys.CardInsights;
CREATE TABLE IF NOT EXISTS sys.CardInsights (
    isStroke varchar(32) NULL,
    isCardiopathy varchar(32) NULL,
    count INT NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;



DROP TABLE sys.HyperInsights;
CREATE TABLE IF NOT EXISTS sys.HyperInsights (
    isStroke varchar(32) NULL,
    isHypertension varchar(32) NULL,
    count INT NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;



DROP TABLE sys.SmokingInsights;
CREATE TABLE IF NOT EXISTS sys.SmokingInsights (
    isStroke varchar(32) NULL,
    isSmoking varchar(32) NULL,
    count INT NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;