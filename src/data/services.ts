import {
  UserGroupIcon,
  CodeBracketIcon,
  SparklesIcon,
  RocketLaunchIcon,
  BeakerIcon,
  ClipboardDocumentCheckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

type ServiceTranslationKey = 
  | 'services.recruitment.title'
  | 'services.recruitment.description'
  | 'services.automation.title'
  | 'services.automation.description'
  | 'services.qa.title'
  | 'services.qa.description'
  | 'services.workflow.title'
  | 'services.workflow.description'
  | 'services.ai.title'
  | 'services.ai.description'
  | 'services.development.title'
  | 'services.development.description';

type ServiceFeatureKey = 
  | 'services.recruitment.features.profiling'
  | 'services.recruitment.features.technical'
  | 'services.recruitment.features.soft'
  | 'services.recruitment.features.integration'
  | 'services.recruitment.features.hr'
  | 'services.recruitment.features.admin'
  | 'services.automation.features.functional'
  | 'services.automation.features.performance'
  | 'services.automation.features.ci'
  | 'services.automation.features.api'
  | 'services.automation.features.cross'
  | 'services.automation.features.reporting'
  | 'services.qa.features.manual'
  | 'services.qa.features.regression'
  | 'services.qa.features.acceptance'
  | 'services.qa.features.compatibility'
  | 'services.qa.features.bugs'
  | 'services.qa.features.documentation'
  | 'services.workflow.features.integration'
  | 'services.workflow.features.automation'
  | 'services.workflow.features.custom'
  | 'services.workflow.features.triggers'
  | 'services.workflow.features.ai'
  | 'services.workflow.features.support'
  | 'services.ai.features.automation'
  | 'services.ai.features.prediction'
  | 'services.ai.features.generation'
  | 'services.ai.features.optimization'
  | 'services.ai.features.anomaly'
  | 'services.ai.features.reporting'
  | 'services.development.features.frameworks'
  | 'services.development.features.tools'
  | 'services.development.features.ci'
  | 'services.development.features.scripts'
  | 'services.development.features.monitoring'
  | 'services.development.features.custom';

interface Service {
  name: ServiceTranslationKey;
  description: ServiceTranslationKey;
  icon: any; // You might want to type this more strictly
  features: ServiceFeatureKey[];
}

export const services: Service[] = [
  {
    name: 'services.recruitment.title',
    description: 'services.recruitment.description',
    icon: UserGroupIcon,
    features: [
      'services.recruitment.features.profiling',
      'services.recruitment.features.technical',
      'services.recruitment.features.soft',
      'services.recruitment.features.integration',
      'services.recruitment.features.hr',
      'services.recruitment.features.admin'
    ]
  },
  {
    name: 'services.automation.title',
    description: 'services.automation.description',
    icon: BeakerIcon,
    features: [
      'services.automation.features.functional',
      'services.automation.features.performance',
      'services.automation.features.ci',
      'services.automation.features.api',
      'services.automation.features.cross',
      'services.automation.features.reporting'
    ]
  },
  {
    name: 'services.qa.title',
    description: 'services.qa.description',
    icon: ClipboardDocumentCheckIcon,
    features: [
      'services.qa.features.manual',
      'services.qa.features.regression',
      'services.qa.features.acceptance',
      'services.qa.features.compatibility',
      'services.qa.features.bugs',
      'services.qa.features.documentation'
    ]
  },
  {
    name: 'services.workflow.title',
    description: 'services.workflow.description',
    icon: ArrowPathIcon,
    features: [
      'services.workflow.features.integration',
      'services.workflow.features.automation',
      'services.workflow.features.custom',
      'services.workflow.features.triggers',
      'services.workflow.features.ai',
      'services.workflow.features.support'
    ]
  },
  {
    name: 'services.ai.title',
    description: 'services.ai.description',
    icon: SparklesIcon,
    features: [
      'services.ai.features.automation',
      'services.ai.features.prediction',
      'services.ai.features.generation',
      'services.ai.features.optimization',
      'services.ai.features.anomaly',
      'services.ai.features.reporting'
    ]
  },
  {
    name: 'services.development.title',
    description: 'services.development.description',
    icon: CodeBracketIcon,
    features: [
      'services.development.features.frameworks',
      'services.development.features.tools',
      'services.development.features.ci',
      'services.development.features.scripts',
      'services.development.features.monitoring',
      'services.development.features.custom'
    ]
  }
]; 