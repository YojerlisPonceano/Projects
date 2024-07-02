import scrapy
from ..items import StockFollowupItem

class StockTrackerSpider(scrapy.Spider):
    name = "stock_tracker"
    allowed_domains = ["slickcharts.com"]
    start_urls = [
        "https://www.slickcharts.com/sp500"
    ]

    def parse(self, response):
        items = StockFollowupItem()
        stock_ticker = response.css('td~ td+ td a').css('::text').extract()
        stock_portafolio_percentage = response.css('.col-lg-7 td:nth-child(4)').css('::text').extract()

        items['stock_ticker'] = stock_ticker
        items['stock_portafolio_percentage'] = stock_portafolio_percentage

        yield items

