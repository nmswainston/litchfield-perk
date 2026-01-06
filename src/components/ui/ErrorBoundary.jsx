import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary:", error);
    }

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    if (window.plausible) {
      window.plausible("Error", {
        props: {
          component: this.props.componentName || "Unknown",
          error: error.message,
        },
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary p-8 text-center bg-red-50 border border-red-200 rounded-lg">
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-bold text-red-800 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-red-600 mb-4">
              We're sorry, but something unexpected happened. Please try
              refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Refresh Page
            </button>

            {import.meta.env.DEV && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-red-600 hover:text-red-800">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 text-xs text-red-700 bg-red-100 p-2 rounded overflow-auto">
                  {this.state.error && this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
