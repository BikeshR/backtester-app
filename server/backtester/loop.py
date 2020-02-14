# Declare the components with respective parameters
import time
import queue

from backtester.data.alphavantage_data_handler import AlphavantageDataHandler
from backtester.strategy.buy_and_hold_strategy import BuyAndHoldStrategy
from backtester.portfolio.naive_portfolio import NaivePortfolio
from backtester.execution.simulated_execution_handler import SimulatedExecutionHandler


def loop():

    # Events
    events = queue.Queue()

    # Bars
    bars = AlphavantageDataHandler(events, ['MSFT'])

    # Strategies
    strategy = BuyAndHoldStrategy(bars, events)

    # Portfolios
    start_date = '2019-09-27'
    port = NaivePortfolio(bars, events, start_date)

    # Brokers
    broker = SimulatedExecutionHandler(events)

    while True:
        # Update the bars (specific backtest code, as opposed to live trading)
        if bars.continue_backtest:
            bars.update_bars()
        else:
            break

        # Handle the events
        while True:
            try:
                print(events)
                event = events.get(False)
            except queue.Empty:
                break
            else:
                print(event)
                if event is not None:
                    if event.type == 'MARKET':
                        strategy.calculate_signals(event)
                        port.update_timeindex(event)

                    elif event.type == 'SIGNAL':
                        port.update_signal(event)

                    elif event.type == 'ORDER':
                        broker.execute_order(event)

                    elif event.type == 'FILL':
                        port.update_fill(event)

        # 10-Minute heartbeat
        time.sleep(10)
