import React from "react";

export class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
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
            fontWeight: "700",
            marginTop: 12,
            textAlign: "center",
          }}
        >
          {this.state.error.message}
        </div>
      );
    }

    return this.props.children;
  }
}
