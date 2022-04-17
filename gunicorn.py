import logging
import logging.handlers
import multiprocessing
import os

from logging.handlers import WatchedFileHandler

# bind = "0.0.0.0:8000"
timeout = 30
backlog = 512

workers = multiprocessing.cpu_count()*2 + 1
