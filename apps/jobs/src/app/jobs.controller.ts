import {
  AcknowledgeRequest,
  GrpcLoggerInterceptor,
  JobsServiceController,
  JobsServiceControllerMethods,
} from '@libs/grpc';
import { Controller, UseInterceptors } from '@nestjs/common';

import { JobsService } from './jobs.service';

@Controller()
@JobsServiceControllerMethods()
@UseInterceptors(GrpcLoggerInterceptor)
export class JobsController implements JobsServiceController {
  constructor(private readonly jobsService: JobsService) {}
  async acknowledge(request: AcknowledgeRequest) {
    return await this.jobsService.acknowledge(request.jobId);
  }
}
