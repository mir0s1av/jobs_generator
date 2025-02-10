import { Job } from '../decorators/jobs.decorator';
import { AbstractJob } from './abstract.job';

@Job({
  name: 'Fibonacci',
  description: 'generate Fib sequance and store in db',
})
export class FibonacciJob extends AbstractJob {}
