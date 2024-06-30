# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import pyodbc
from .data_processing import get_all_data, remove_percentage_sign
import pandas as pd

class StockFollowupPipeline:
    def __init__(self):
        self.create_connection()
        self.create_table()

    def create_connection(self):
        self.conn = pyodbc.connect('Driver={SQL Server};'
                     'Server=DESKTOP-34ID2F4;'
                     'Database=stocks;'
                     'Trusted_Connection=yes;')
        self.curr = self.conn.cursor()

    def create_table(self):
        self.curr.execute("""DROP TABLE IF EXISTS stocks_data;""")
        self.curr.execute("""create table stocks_data(
                             Company text,
                             Industry text,
                             Sector text,
                             City text,
                             ZipCode varchar(10),
                             State varchar(4),
                             Exchange text,
                             PortafolioPercentage float,
                             LastClose float,
                             MarketCap float,
                             FullTimeEmployees integer,
                             Recommendation varchar(15)                     
                             );""")

    def process_item(self, item, spider):
        list_stocks = item['stock_ticker']
        list_portafolio_percentage = remove_percentage_sign(item['stock_portafolio_percentage'])

        data = pd.DataFrame(get_all_data(list_stocks, list_portafolio_percentage)).values.tolist()
        self.store_db(data)

        return item

    def store_db(self, data):
        insert_query = """INSERT INTO stocks_data(
                             Company,
                             Industry,
                             Sector,
                             City,
                             ZipCode,
                             State,
                             Exchange,
                             PortafolioPercentage,
                             LastClose,
                             MarketCap,
                             FullTimeEmployees,
                             Recommendation) 
                          VALUES (?, ?, ?, ?,
                                  ?, ?, ?, ?,
                                  ?, ?, ?, ?);"""
        self.curr.executemany(insert_query, data)
        self.conn.commit()
        self.conn.close()
