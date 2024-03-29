import { Test, TestingModule } from '@nestjs/testing';
import { SeedsProvider } from './seeds.provider';

describe('Seeds', () => {
  let provider: SeedsProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeedsProvider],
    }).compile();

    provider = module.get<SeedsProvider>(SeedsProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
