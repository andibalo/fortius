package logger

type Logger interface {
	Info(msg string, keysAndValues ...any)
	Error(msg string, keysAndValues ...any)
	Fatal(msg string, keysAndValues ...any)
	With(keysAndValues ...any) Logger
}

var defaultLogger Logger

func Set(l Logger) {
	if defaultLogger != nil {
		panic("logger already initialized")
	}
	defaultLogger = l
}

func Info(msg string, kvs ...any)  { defaultLogger.Info(msg, kvs...) }
func Error(msg string, kvs ...any) { defaultLogger.Error(msg, kvs...) }
func Fatal(msg string, kvs ...any) { defaultLogger.Fatal(msg, kvs...) }
func With(kvs ...any) Logger       { return defaultLogger.With(kvs...) }
