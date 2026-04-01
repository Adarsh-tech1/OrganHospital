import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-950 text-white p-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-900/20 border border-red-600 rounded-lg p-8">
              <h1 className="text-3xl font-bold text-red-400 mb-4">
                ⚠️ Something went wrong
              </h1>
              <div className="bg-gray-900 p-4 rounded mb-4 overflow-auto max-h-96">
                <p className="text-red-300 font-mono whitespace-pre-wrap break-words">
                  {this.state.error?.toString()}
                </p>
              </div>
              {this.state.errorInfo && (
                <div className="bg-gray-900 p-4 rounded mb-4 overflow-auto max-h-96">
                  <p className="text-gray-400 font-mono text-sm whitespace-pre-wrap break-words">
                    {this.state.errorInfo.componentStack}
                  </p>
                </div>
              )}
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-semibold transition"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
