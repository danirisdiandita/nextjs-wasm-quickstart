package main

import (
	"syscall/js"
)

// Export an add function to JavaScript
func adder(this js.Value, p []js.Value) interface{} {
	// Get the two numbers from parameters
	a := p[0].Int()
	b := p[1].Int()

	// Add them and return result
	sum := a + b
	return js.ValueOf(sum)
}

func main() {
	// Export the "adder" function to JavaScript
	js.Global().Set("adder", js.FuncOf(adder))

	// Keep the Go program running
	select {}
}
