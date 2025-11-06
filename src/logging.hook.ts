
export class OpenFeatureLoggingHook {
  before(hookContext: any) {
    console.log(hookContext)
    console.log(`Before evaluation - Flag: ${hookContext.flagKey}, Context: ${JSON.stringify(hookContext.context)}`);
    return hookContext;
  }

  after(hookContext: any, evaluationDetails: any) {
    console.log(`After evaluation - Flag: ${hookContext.flagKey}, Value: ${JSON.stringify(evaluationDetails)}`);
  }

  error(hookContext: any, error: any) {
    console.error(error)
    console.error(`Error during evaluation - Flag: ${hookContext.flagKey}, Error: ${error.message}`);
  }

  finally(hookContext: any) {
    console.log(`Evaluation completed - Flag: ${hookContext.flagKey}`);
  }
}
