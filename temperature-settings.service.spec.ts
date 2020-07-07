import { TestBed } from '@angular/core/testing';
import { TemperatureSettingsService } from './temperature-settings.service';

describe('TemperatureSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemperatureSettingsService = TestBed.get(
      TemperatureSettingsService
    );
    expect(service).toBeTruthy();
  });
});
