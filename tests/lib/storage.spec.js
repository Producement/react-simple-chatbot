import { describe, it } from 'mocha';
import { expect } from 'chai';
import * as storage from '../../lib/storage';

describe('Storage', () => {
  it('stores data', () => {
    const state = {
      currentStep: {
        '@class': '.TextStep',
        id: '2',
        message: 'Second message',
        trigger: '3',
        key: 'onBXJDcgEv1DVHENYb37378B'
      },
      previousStep: { '@class': '.TextStep', id: '1', message: 'First message', trigger: '2' },
      previousSteps: [
        {
          '@class': '.TextStep',
          id: '1',
          message: 'First message',
          trigger: '2'
        },
        {
          '@class': '.TextStep',
          id: '2',
          message: 'Second message',
          trigger: '3',
          key: 'onBXJDcgEv1DVHENYb37378B'
        }
      ],
      renderedSteps: [
        {
          '@class': '.TextStep',
          id: '1',
          message: 'First message',
          trigger: '2'
        },
        {
          '@class': '.TextStep',
          id: '2',
          message: 'Second message',
          trigger: '3',
          key: 'onBXJDcgEv1DVHENYb37378B'
        }
      ]
    };
    const steps = [
      {
        '@class': '.TextStep',
        id: '1',
        message: 'First message',
        trigger: '2'
      },
      {
        '@class': '.TextStep',
        id: '2',
        message: 'Second message',
        trigger: '3'
      },
      {
        '@class': '.TextStep',
        id: '3',
        message: 'Third message',
        end: true
      }
    ];
    const stringifiedState = storage.setData('storage_cache', state);

    const { currentStep } = storage.getData({
      cacheName: 'storage_cache',
      cache: stringifiedState,
      firstStep: steps[0],
      steps
    });

    expect(currentStep).to.eql(state.currentStep); // TODO: proper test
  });
});
