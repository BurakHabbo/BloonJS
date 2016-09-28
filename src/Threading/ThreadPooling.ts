import Runnable from './Runnable';
import Emulator from '../Emulator';

export default class ThreadPooling {
    public constructor() {
        Emulator.getLogging().logStart('Thread Pool -> Loaded!');
    }

    public schedule(runnable: Runnable, delay: number): void {
        setInterval(function() {
            runnable.run();
        }, delay);
    }
}
