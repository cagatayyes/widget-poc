import React, { Component, ReactNode } from 'react';

interface IErrorBoundaryProps {
  children: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
  errorMessage?: string;
}

export class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
	public state: IErrorBoundaryState = {
		hasError: false,
		errorMessage: '',
	};

	public static getDerivedStateFromError(): IErrorBoundaryState {
		return { hasError: true };
	}

	public componentDidCatch(error: Error): void {
		// Set the error message - for development env.
		if (process.env.NODE_ENV === 'development') {
			this.setState({ errorMessage: error.message });
		}
	}

	public render(): ReactNode {
		if (this.state.hasError) {
			return (
				<div>
					<h1>Something went wrong.</h1>
					{process.env.NODE_ENV === 'development' && this.state.errorMessage && (
						<p>Error: {this.state.errorMessage}</p>
					)}
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
