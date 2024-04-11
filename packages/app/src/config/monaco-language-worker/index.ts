import { LanguageIdEnum } from 'monaco-sql-languages'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import FlinkSQLWorker from 'monaco-sql-languages/esm/languages/flink/flink.worker?worker'
import SparkSQLWorker from 'monaco-sql-languages/esm/languages/spark/spark.worker?worker'
import HiveSQLWorker from 'monaco-sql-languages/esm/languages/hive/hive.worker?worker'
import PGSQLWorker from 'monaco-sql-languages/esm/languages/pgsql/pgsql.worker?worker'
import MySQLWorker from 'monaco-sql-languages/esm/languages/mysql/mysql.worker?worker'
import TrinoSQLWorker from 'monaco-sql-languages/esm/languages/trino/trino.worker?worker'
import ImpalaSQLWorker from 'monaco-sql-languages/esm/languages/impala/impala.worker?worker'

const workerMapper: Record<string, Worker> = {
  [LanguageIdEnum.FLINK]: new FlinkSQLWorker(),
  [LanguageIdEnum.SPARK]: new SparkSQLWorker(),
  [LanguageIdEnum.HIVE]: new HiveSQLWorker(),
  [LanguageIdEnum.PG]: new PGSQLWorker(),
  [LanguageIdEnum.MYSQL]: new MySQLWorker(),
  [LanguageIdEnum.TRINO]: new TrinoSQLWorker(),
  [LanguageIdEnum.IMPALA]: new ImpalaSQLWorker(),
}

window.MonacoEnvironment = {
  getWorker(_: unknown, label: string) {
    return workerMapper[label] || new EditorWorker()
  },
}
