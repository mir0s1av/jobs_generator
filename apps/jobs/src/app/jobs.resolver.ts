import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Job } from './models/jobs.model';
import { JobsService } from './jobs.service';
import { ExecuteJobInput } from './dto/execute-job-input.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@libs/graphql';
import { FindJobInput } from './models/find-job.dto';

@Resolver(() => Job)
@UseGuards(GqlAuthGuard)
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Query(() => [Job], { name: 'jobs' })
  async jobs() {
    return this.jobsService.getJobs();
  }

  @Query(() => Job)
  async job(@Args('input') input: FindJobInput) {
    return this.jobsService.getJob(input);
  }
  @Mutation(() => Job)
  async executeJob(@Args('input') input: ExecuteJobInput) {
    return this.jobsService.executeJob(input);
  }
}
