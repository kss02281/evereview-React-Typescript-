FROM python:3.8-alpine
COPY . /app
WORKDIR /app

RUN apk add --no-cache build-base libffi-dev
RUN pip3 install -r requirements.txt

ENV FLASK_APP evereview.app
ENV FLASK_ENV production
ENV CLIENT_ID []
ENV CLIENT_SECRET []
ENV SECRET_KEY []
ENV JWT_SECRET_KEY []


CMD ["gunicorn", "evereview.app:application", "-b", "0.0.0.0:5000", "--workers=4", "--threads=4"]
