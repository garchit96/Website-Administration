import { TestBed } from '@angular/core/testing';

import { ManageUserGroupsService } from './manage-user-groups.service';

describe('ManageUserGroupsService', () => {
  let service: ManageUserGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageUserGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
