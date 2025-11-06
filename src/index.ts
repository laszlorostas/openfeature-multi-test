import { OpenFeature, EvaluationContext, Provider, MultiProvider, FirstSuccessfulStrategy } from '@openfeature/server-sdk'
import { EnvVarProvider } from '@openfeature/env-var-provider'
import { FlagdProvider } from '@openfeature/flagd-provider'
import { OpenFeatureLoggingHook } from './logging.hook'

const createOpenFeatureProvider = (): Provider => {
    const provider = new FlagdProvider({
        resolverType: 'in-process',
        offlineFlagSourcePath: './flagd-config.json',
        defaultAuthority: 'in-process',
    }, console)
    
    const multiProvider = new MultiProvider([
      { provider },
      { provider: new EnvVarProvider() }
    ], new FirstSuccessfulStrategy() )

    return multiProvider
}

const createContextExtractor = (): EvaluationContext => ({
    time: new Date(),
    role: 'admin',
    environment: 'production', 
})

const main = async () => {
    const provider = createOpenFeatureProvider()
    OpenFeature.addHooks(new OpenFeatureLoggingHook())
    await OpenFeature.setProviderAndWait(provider)

    const evaluationContext = createContextExtractor()
    const client = OpenFeature.getClient()
    const example1 = await client.getBooleanValue('example1', false, evaluationContext)
    const example2 = await client.getStringValue('example2', 'no', evaluationContext)

    console.log(example1)
    console.log(example2)
}

main()
