import yfinance as yf

def get_stock_data(company_ticker: str, portafolio_percentage: float) -> dict:
    ticker = yf.Ticker(company_ticker)
    company_info = {
        'Company' : ticker.info['shortName'],
        'Industry' : ticker.info['industry'],
        'Sector' : ticker.info['sector'],
        'City' : ticker.info['city'],
        'ZipCode' : ticker.info['zip'][:5],
        'State' : ticker.info['state'],
        'Exchange' : ticker.info['exchange'],
        'PortafolioPercentage' : portafolio_percentage,
        'LastClose' : ticker.info['previousClose'],
        'MarketCap' : ticker.info['marketCap'],
        'FullTimeEmployees' : ticker.info['fullTimeEmployees'],
        'Recommendation' : ticker.info['recommendationKey']
     }
    return company_info

def get_all_data(list_stocks: list[str], list_portafolio_percentage: list[float]) -> list[dict]:
    stock_data = []
    for ticker, portafolio_percentage in zip(list_stocks, list_portafolio_percentage):
        try:
            stock_data.append(get_stock_data(ticker,portafolio_percentage))
        except:
            pass
    return stock_data


def remove_percentage_sign(list_data: list[str]) -> list[float]:
    list_numbers = []
    for data in list_data:
        list_numbers.append(float(data[:-1]))
    return list_numbers