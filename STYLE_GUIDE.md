# UI Modernization Guide: Applying Onboarding Design Patterns

This document outlines how to apply the modern, conversational, and card-based design language established in the onboarding flow to other views within the application. The goal is to create a cohesive, visually appealing, and user-friendly experience across the entire app.

The recent update to `GenerateMealsSheet.swift` serves as the primary reference for this modernization effort.

## Core Principles

1.  **Conversational Headers**: Introduce screens with a friendly, AI-driven header, similar to the `AIOnboardingSummaryView`, to make the interaction feel more personal and guided.
2.  **Card-Based Layouts**: Group related content and controls into distinct cards with soft, material backgrounds. This improves visual organization and hierarchy.
3.  **Component Standardization**: Replace standard SwiftUI controls with custom, styled components from the onboarding flow (e.g., `SimpleTextEditor`, `InfoBulletPoint`) for a consistent look and feel.
4.  **Consistent Call-to-Action (CTA)**: Use a standardized, full-width, capsule-style button for primary actions, ensuring it's visually distinct and placed accessibly at the bottom of the screen.
5.  **Adaptive Layouts**: Employ `ScrollView` and `safeAreaInset` to ensure views are scrollable on all screen sizes and that the primary CTA button remains anchored to the bottom without overlapping content.

---

## Implementation Steps

### 1. Adopt a Conversational Header

Instead of a simple title, introduce the screen's purpose with a Lumo-themed header.

**Implementation:**

```swift
// AI Header inspired by Onboarding
VStack(alignment: .leading, spacing: DesignTokens.Spacing.medium) {
    HStack {
        HStack(spacing: 8) {
            Image("lumo-bear")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 28, height: 42)
                .clipShape(RoundedRectangle(cornerRadius: 6))
            
            Image(systemName: "sparkles")
                .font(.system(size: 20))
                .foregroundColor(DesignTokens.Colors.accent)
                .symbolRenderingMode(.hierarchical)
                .symbolEffect(.pulse.byLayer, options: .repeating)
        }
        
        Text("Lumo")
            .font(DesignTokens.Typography.appName())
            .foregroundColor(DesignTokens.Colors.textPrimary)
        
        Spacer()
    }
    
    Text("Ready to plan your meals for the week? Tell me what you'd like!")
        .font(.body)
        .foregroundColor(DesignTokens.Colors.textPrimary)
        .lineSpacing(4)
}
.padding(DesignTokens.Spacing.large)
.background(
    RoundedRectangle(cornerRadius: 16)
        .fill(.regularMaterial)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(DesignTokens.Colors.flamingoAccent.opacity(0.2), lineWidth: 1)
        )
)
.padding(.horizontal)
```

### 2. Use Card-Based Layouts

Group sections of the UI into individual cards. This separates concerns and creates a clean, organized layout.

**Implementation:**

Wrap each logical section (e.g., "Day Selection", "Instructions") in a `VStack`, apply padding, and use the standard card background style.

```swift
VStack(alignment: .leading, spacing: DesignTokens.Spacing.medium) {
    // ... Content of the card (e.g., Text, DaySelectionView)
}
.padding(DesignTokens.Spacing.large)
.background(
    RoundedRectangle(cornerRadius: 16)
        .fill(Color.primary.opacity(0.05))
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(Color.primary.opacity(0.1), lineWidth: 1)
        )
)
.padding(.horizontal)
```

### 3. Standardize UI Components

#### Text Inputs

Replace the standard `TextField` with the more robust and better-styled `SimpleTextEditor` for multi-line inputs.

**Before:**
```swift
TextField("Placeholder", text: $instructions, axis: .vertical)
    .textFieldStyle(.roundedBorder)
```

**After:**
```swift
SimpleTextEditor(
    placeholder: "Your placeholder text...",
    text: $instructions,
    minHeight: 80,
    lineLimit: 3...6
)
```

#### Informational Text

Convert simple informational labels into `InfoBulletPoint` components for consistency.

**Before:**
```swift
HStack(spacing: 4) {
    Image(systemName: "info.circle.fill")
    Text("Your instructions will guide the AI...")
}
```

**After:**
```swift
InfoBulletPoint(
    icon: "info.circle.fill",
    text: "Your instructions will guide the AI while respecting your dietary needs.",
    color: .secondary
)
```

### 4. Standardize the Call-to-Action Button

The primary action button should be anchored to the bottom of the screen. Use `safeAreaInset` on the `ScrollView` for this.

**Implementation:**

```swift
// Apply this to the ScrollView
.safeAreaInset(edge: .bottom) {
    Button(action: { /* onGenerate() */ }) {
        HStack(spacing: 8) {
            Image(systemName: "sparkles")
                .symbolEffect(.pulse)
            Text("Generate Meal Plan")
                .fontWeight(.semibold)
                .font(.headline)
        }
        .foregroundColor(.white)
        .frame(maxWidth: .infinity)
        .frame(height: 52)
        .background(
            // Handle disabled state styling
            RoundedRectangle(cornerRadius: 26)
                .fill(selectedDays.isEmpty ? Color.secondary.opacity(0.3) : DesignTokens.Colors.accent)
        )
        .opacity(selectedDays.isEmpty ? 0.6 : 1.0)
    }
    .buttonStyle(.plain)
    .disabled(selectedDays.isEmpty)
    .padding(.horizontal, 24)
    .padding(.vertical, 12)
    .background(.bar) // Use a bar material for the background area
}
```

### 5. Component Portability: A Crucial Note

The `GenerateMealsSheet.swift` file now contains private, local copies of components from the onboarding flow (`SimpleTextEditor`, `InfoBulletPoint`, `View+if`).

**Action Required:** To ensure maintainability and avoid code duplication, these components should be extracted from `GenerateMealsSheet.swift` and moved into a shared UI library or module within the project. This will make them reusable across any view that needs to be modernized.

**List of Components to Move:**
- `private struct SimpleTextEditor`
- `private struct InfoBulletPoint`
- `fileprivate extension View` (for the `.if` modifier)
