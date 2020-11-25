import { TestBed } from "@angular/core/testing";

import { DialogService } from "@shared/dialog/dialog.service";
import {MaterialModule} from "@material/material.module";

describe("DialogService", () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [MaterialModule]
    });
    service = TestBed.inject(DialogService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
