# Build stage
FROM golang:1.25-alpine AS builder

WORKDIR /app

# Download dependencies first (layer cache)
COPY go.mod go.sum ./
RUN go mod download

# Copy source and build
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o bin/server ./cmd/server

# Runtime stage
FROM alpine:3.20

RUN apk --no-cache add ca-certificates tzdata

WORKDIR /app

COPY --from=builder /app/bin/server .

EXPOSE 8080

CMD ["./server"]
