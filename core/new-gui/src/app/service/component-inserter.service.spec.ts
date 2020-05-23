import { TestBed } from '@angular/core/testing';

import { ComponentInserterService } from './component-inserter.service';

describe('ComponentInserterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComponentInserterService = TestBed.get(ComponentInserterService);
    expect(service).toBeTruthy();
  });
});
