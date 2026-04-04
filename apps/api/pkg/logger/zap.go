package logger

import "go.uber.org/zap"

type zapLogger struct {
	s *zap.SugaredLogger
}

func New(env string) (Logger, error) {
	var (
		z   *zap.Logger
		err error
	)
	if env == "production" {
		z, err = zap.NewProduction()
	} else {
		z, err = zap.NewDevelopment()
	}
	if err != nil {
		return nil, err
	}
	return &zapLogger{s: z.Sugar()}, nil
}

func (l *zapLogger) Info(msg string, kvs ...any)  { l.s.Infow(msg, kvs...) }
func (l *zapLogger) Error(msg string, kvs ...any) { l.s.Errorw(msg, kvs...) }
func (l *zapLogger) Fatal(msg string, kvs ...any) { l.s.Fatalw(msg, kvs...) }
func (l *zapLogger) With(kvs ...any) Logger       { return &zapLogger{s: l.s.With(kvs...)} }
