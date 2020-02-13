# Declare the components with respective parameters
from datetime import time
import queue

from backtester.data.alphavantage_data_handler import AlphavantageDataHandler
# from backtester.event.event import Event
# from backtester.execution_handler import ExecutionHandler
# from backtester.portfolio import Portfolio
# from backtester.strategy import Strategy

def loop():

    # Events
    events = queue.Queue()

    # Bars
    bars = AlphavantageDataHandler(events, ['MSFT'])

    # Strategies
    strategy = Strategy()

    # Portfolios
    port = Portfolio()

    # Brokers
    broker = ExecutionHandler()

    while True:
        # Update the bars (specific backtest code, as opposed to live trading)
        if bars.continue_backtest:
            bars.update_bars()
        else:
            break

        # Handle the events
        while True:
            try:
                event = events.get(False)
            except queue.Empty:
                break
            else:
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
        time.sleep(10 * 60)
