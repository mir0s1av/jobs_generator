import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Job } from './models/jobs.model';
import { JobsService } from './jobs.service';
import { ExecuteJobInput } from './dto/execute-job-input.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@jobs-generator/nestjs';

@Resolver(() => Job)
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => [Job], { name: 'jobs' })
  async jobs() {
    return this.jobsService.getJobs();
  }
  @Mutation(() => Job)
  async executeJob(@Args('input') input: ExecuteJobInput) {
    return this.jobsService.executeJob(input);
  }
}
