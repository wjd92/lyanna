import logging
import logging.handlers
import multiprocessing
import os

from logging.handlers import WatchedFileHandler

bind = "127.0.0.1:8000"
timeout = 30
backlog = 512

workers = multiprocessing.cpu_count()*2 + 1
