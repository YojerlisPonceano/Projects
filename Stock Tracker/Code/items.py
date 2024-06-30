# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy

class StockFollowupItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    stock_ticker = scrapy.Field()
    stock_portafolio_percentage = scrapy.Field()
