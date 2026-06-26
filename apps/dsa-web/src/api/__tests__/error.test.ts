import { describe, expect, it } from 'vitest';
import { parseApiError } from '../error';

describe('parseApiError', () => {
  it('shows missing Agent model guidance when Agent unavailable detail reports missing_model', () => {
    const parsed = parseApiError({
      response: {
        status: 400,
        data: {
          detail: {
            error: 'agent_unavailable',
            reason: 'missing_model',
            message: 'No Agent model configured.',
          },
        },
      },
    });

    expect(parsed.category).toBe('agent_disabled');
    expect(parsed.title).toBe('Agent 模式未开启');
    expect(parsed.message).toContain('配置可用的 Agent 主模型');
    expect(parsed.message).toContain('LLM 主模型');
  });
});
