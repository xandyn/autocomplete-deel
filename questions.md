### Q&A

---
#### 1. What is the difference between Component and PureComponent? give an example where it might break my app.
PureComponent have implemented `shouldComponentUpdate` method with shallow state and props comparison.

Because PureComponent shallow compare, in cases where the state or props are complex objects, it will not re-render the component and can break the app.

---
#### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
For example if we have a component with `shouldComponentUpdate` that uses context, and the context is changed, the component might not re-render (unless state or props are changed) and the context will not propagate to the children.

---
#### 3. Describe 3 ways to pass information from a component to its PARENT.
1. Using callback
2. Using context
3. Using any state manager

---
#### 4. Give 2 ways to prevent components from re-rendering.
1. Using `shouldComponentUpdate` and compare the state and props
2. Using `React.memo` in second argument we can pass a function that will compare the props

---
#### 5. What is a fragment and why do we need it? Give an example where it might break my app.
Fragment is a component that can be used to return multiple nodes from a component.

Honestly have no idea where it might break the app. Forgetting to add a key to the fragment in `map()` maybe?

---
#### 6. Give 3 examples of the HOC pattern.
1. `withRouter` from `react-router-dom`
2. `connect` from `react-redux`
3. `withTranslation` from `react-i18next`

---
#### 7. what's the difference in handling exceptions in promises, callbacks and async...await.
In promises we can use `catch()` to handle the error.

In callbacks pass the error as the first argument to the callback.

In async...await we can use `try...catch` to handle the error.

---
#### 8. How many arguments does setState take and why is it async.
setState takes 2 arguments, the first is the state to update and the second is a callback that will be called after the state is updated and the component is re-rendered.

setState is async because it is batched, so if we call it multiple times it will be called only once.

---
#### 9. List the steps needed to migrate a Class to Function Component.
1. Create a new file for the function component.
2. Replace the class declaration with a function declaration and remove the render method.
3. Replace `this.props` with `props` in the function body.
4. Convert any lifecycle methods to hooks, such as `componentDidMount` to `useEffect`.
5. If the component uses state, replace `this.state` and `this.setState` with the `useState` hook.
6. Test the function component and delete the original class component file.

---
#### 10. List a few ways styles can be used with components.
1. Inline styles
2. CSS files
3. CSS in JS
4. CSS modules

---
#### 11. How to render an HTML string coming from the server.
We can use `dangerouslySetInnerHTML` prop to render the HTML string.