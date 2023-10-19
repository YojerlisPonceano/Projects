--World Stock Prices 
--for the world's most famous brands (Data from 2000 - 2023)
--Source:--https://www.kaggle.com/datasets/nelgiriyewithana/world-stock-prices-daily-updating


---------------------------------------------------------------------------------------------------------------------------------
--All time highest of each stock

select WS.ticker, ws.brand_name,  max(CONVERT(float,WSP.High)) as AllTimeHigh
from MyProjects.dbo.WorldStockPrices as WSP
join MyProjects.dbo.WorldStocks  as WS
on WSP.Ticker = WS.Ticker
group by WS.Ticker, ws.brand_name

---------------------------------------------------------------------------------------------------------------------------------

--Stocks with the highest Annual growht rate (2000 - 2023)


--Initial Value Table
drop table if exists #temp_InitalValue
Create table #temp_InitalValue (
  Ticker varchar(50),
  IntialValue float
  )


Drop table if exists #temp_MinDate
create table #temp_MinDate(
 Ticker varchar(50),
 MinDate date
)
insert into #temp_MinDate
select Ticker, min(CONVERT(date,[date]))
from MyProjects.dbo.WorldStockPrices 
group by Ticker



insert into  #temp_InitalValue
select st.Ticker, convert(float,[Open])
from MyProjects.dbo.WorldStockPrices As st
join #temp_MinDate as MD
on st.Ticker = MD.Ticker
where CONVERT(date,[date]) = MinDate




--Current Value Table
drop table if exists #temp_FinalValue
Create table #temp_FinalValue(
  Ticker varchar(50),
  FinalValue float
  )
insert into  #temp_FinalValue
select Ticker, convert(float,[Close])
from MyProjects.dbo.WorldStockPrices 
where date like '2023-09-20%'


--Calculation of the rate
With CTR_GrowthRate as(
Select FV.Ticker, IV.IntialValue, FV.FinalValue,
((power((FV.FinalValue/iv.IntialValue),0.0434782609))-1)*100 as CompoundAnualGrowthRate
from #temp_FinalValue as FV
join #temp_InitalValue as IV
on FV.Ticker=IV.Ticker
)

Select gr.Ticker, stocks.Brand_Name,stocks.Industry_Tag, stocks.Country, GR.CompoundAnualGrowthRate
from CTR_GrowthRate as GR
join MyProjects.dbo.WorldStocks as stocks
on gr.Ticker = stocks.Ticker
order by CompoundAnualGrowthRate desc



---------------------------------------------------------------------------------------------------------------------------------

--Anual growth rate of the market per industry

With CTR_GrowthRate as(
Select FV.Ticker, IV.IntialValue, FV.FinalValue,
((power((FV.FinalValue/iv.IntialValue),0.0434782609))-1)*100 as CompoundAnualGrowthRate
from #temp_FinalValue as FV
join #temp_InitalValue as IV
on FV.Ticker=IV.Ticker
)

select ws.Industry_Tag, AVG(GR.CompoundAnualGrowthRate) as AvgGrowthRate
from CTR_GrowthRate GR
join MyProjects.dbo.WorldStocks WS
on gr.Ticker = ws.Ticker
group by ws.Industry_Tag
order by AvgGrowthRate desc

---------------------------------------------------------------------------------------------------------------------------------
--Sum of dividends per share from 2000 to 2023

select WSP.Ticker, WS.Brand_Name, SUM(convert(float,Dividends)) as DividendsSum
from MyProjects.dbo.WorldStockPrices WSP
join MyProjects.dbo.WorldStocks WS
on wsp.Ticker = WS.Ticker
group by wsp.Ticker, ws.Brand_Name
order by DividendsSum desc



---------------------------------------------------------------------------------------------------------------------------------
--Industries with the most dividends payments amount
select Industry_Tag, SUM(convert(float,Dividends)) as DividendsSum
from MyProjects.dbo.WorldStockPrices WSP
join MyProjects.dbo.WorldStocks WS
on wsp.Ticker = WS.Ticker
group by Industry_Tag
order by DividendsSum desc


----------Views--------------------------------------------------------------
drop view if exists AllTimeHighValueStock
go
create view AllTimeHighValueStock as
select WS.ticker, ws.brand_name,  max(CONVERT(float,WSP.High)) as AllTimeHigh
from MyProjects.dbo.WorldStockPrices as WSP
join MyProjects.dbo.WorldStocks  as WS
on WSP.Ticker = WS.Ticker
group by WS.Ticker, ws.brand_name

