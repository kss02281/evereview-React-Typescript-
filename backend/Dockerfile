FROM python:3.8-alpine
COPY . /app
WORKDIR /app

RUN apk add --no-cache build-base libffi-dev
RUN pip3 install -r requirements.txt

ENV FLASK_APP delivery_app.app
ENV FLASK_ENV production
ENV SECRET_KEY []
ENV JWT_SECRET_KEY []


CMD ["gunicorn", "delivery_app.app:application", "-b", "0.0.0.0:5000", "--workers=4", "--threads=4"]
