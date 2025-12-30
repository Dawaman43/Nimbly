import { Injectable } from '@nestjs/common';
import { CloudResource } from '@nimbly/shared-types';

@Injectable()
export class CloudResourcesService {
  private resources: CloudResource[] = [];

  create(resource: CloudResource): CloudResource {
    this.resources.push(resource);
    return resource;
  }

  getAll(): CloudResource[] {
    return this.resources;
  }

  getOne(id: string): CloudResource | undefined {
    return this.resources.find((resource) => resource.id === id);
  }
}
