import React from "react";

export class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            backgroundColor: "#f75590",
            borderRadius: 12,
            padding: 12,
            color: "#22223b",
            fontWeight: "500",
            marginTop: 12,
          }}
        >
          Something went wrong. Please try again later
        </div>
      );
    }

    return this.props.children;
  }
}
