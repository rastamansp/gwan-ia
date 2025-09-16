// src/hooks/useTelemetry.ts
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { logger } from '../utils/logger';
import {
  createSpan,
  addSpanEvent,
  addSpanAttributes,
} from '../utils/telemetry';
import { TelemetryOptions, TelemetrySpan } from '../types/telemetry';

export const useTelemetry = (options: TelemetryOptions) => {
  const {
    componentName,
    trackPageViews = true,
    trackUserInteractions = true,
    trackPerformance = true,
  } = options;
  const location = useLocation();
  const mountTime = useRef<number>(Date.now());
  const spanRef = useRef<TelemetrySpan | null>(null);

  // Track component mount/unmount
  useEffect(() => {
    mountTime.current = Date.now();

    logger.componentMount(componentName, {
      component: componentName,
      action: 'mount',
      mountTime: mountTime.current,
    });

    // Create span for component lifecycle
    spanRef.current = createSpan(`component-${componentName}`, {
      'component.name': componentName,
      'component.type': 'react',
      'component.mount_time': mountTime.current,
    });

    return () => {
      const unmountTime = Date.now();
      const lifecycleDuration = unmountTime - mountTime.current;

      logger.componentUnmount(componentName, {
        component: componentName,
        action: 'unmount',
        unmountTime,
        lifecycleDuration,
      });

      if (spanRef.current) {
        spanRef.current.setAttributes({
          'component.unmount_time': unmountTime,
          'component.lifecycle_duration': lifecycleDuration,
        });
        spanRef.current.end();
      }
    };
  }, [componentName]);

  // Track page views
  useEffect(() => {
    if (trackPageViews) {
      const page = location.pathname;

      logger.pageView(page, {
        component: componentName,
        action: 'page_view',
        page,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
      });

      addSpanEvent('page_view', {
        'page.name': page,
        'page.referrer': document.referrer,
      });
    }
  }, [location.pathname, componentName, trackPageViews]);

  // Track performance metrics
  useEffect(() => {
    if (trackPerformance) {
      const trackPerformanceMetrics = () => {
        // Track Core Web Vitals
        if ('web-vital' in window) {
          // This would be implemented with web-vitals library
          logger.performance('core_web_vitals', 0, {
            component: componentName,
            metric: 'web_vitals',
          });
        }

        // Track memory usage if available
        if ('memory' in performance) {
          const memory = (
            performance as Performance & {
              memory: {
                usedJSHeapSize: number;
                totalJSHeapSize: number;
                jsHeapSizeLimit: number;
              };
            }
          ).memory;
          logger.performance('memory_usage', memory.usedJSHeapSize, {
            component: componentName,
            metric: 'memory',
            totalJSHeapSize: memory.totalJSHeapSize,
            jsHeapSizeLimit: memory.jsHeapSizeLimit,
          });
        }

        // Track navigation timing
        const navigation = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming;
        if (navigation) {
          logger.performance(
            'navigation_timing',
            navigation.loadEventEnd - navigation.loadEventStart,
            {
              component: componentName,
              metric: 'navigation',
              domContentLoaded:
                navigation.domContentLoadedEventEnd -
                navigation.domContentLoadedEventStart,
              loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
            }
          );
        }
      };

      // Track performance after component is fully loaded
      const timeoutId = setTimeout(trackPerformanceMetrics, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [componentName, trackPerformance]);

  // Track user interactions
  const trackUserInteraction = (
    action: string,
    metadata?: Record<string, unknown>
  ) => {
    if (trackUserInteractions) {
      logger.userAction(action, componentName, {
        component: componentName,
        action,
        timestamp: Date.now(),
        ...metadata,
      });

      addSpanEvent('user_interaction', {
        'user.action': action,
        'user.component': componentName,
        ...metadata,
      });
    }
  };

  // Track errors
  const trackError = (error: Error, context?: Record<string, unknown>) => {
    logger.error(`Error in ${componentName}`, error, {
      component: componentName,
      action: 'error',
      ...context,
    });

    addSpanEvent('error', {
      'error.name': error.name,
      'error.message': error.message,
      'error.component': componentName,
      ...context,
    });
  };

  // Track API calls
  const trackApiCall = (
    endpoint: string,
    method: string,
    metadata?: Record<string, unknown>
  ) => {
    logger.apiCall(endpoint, method, {
      component: componentName,
      endpoint,
      method,
      ...metadata,
    });

    addSpanEvent('api_call', {
      'api.endpoint': endpoint,
      'api.method': method,
      'api.component': componentName,
      ...metadata,
    });
  };

  // Track custom events
  const trackEvent = (
    eventName: string,
    metadata?: Record<string, unknown>
  ) => {
    logger.info(`Custom event: ${eventName}`, {
      component: componentName,
      action: 'custom_event',
      eventName,
      ...metadata,
    });

    addSpanEvent('custom_event', {
      'event.name': eventName,
      'event.component': componentName,
      ...metadata,
    });
  };

  return {
    trackUserInteraction,
    trackError,
    trackApiCall,
    trackEvent,
    addSpanAttributes: (attributes: Record<string, unknown>) => {
      addSpanAttributes({
        'component.name': componentName,
        ...attributes,
      });
    },
  };
};

export default useTelemetry;
