import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Job } from './models/jobs.model';
import { JobsService } from './jobs.service';
import { ExecuteJobInput } from './dto/execute-job-input.dto';

@Resolver(() => Job)
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}
  @Query(() => [Job], { name: 'jobs' })
  async jobs() {
    return this.jobsService.getJobs();
  }
  @Mutation(() => Job)
  async executeJob(@Args('input') input: ExecuteJobInput) {
    return this.jobsService.executeJob(input);
  }
}
