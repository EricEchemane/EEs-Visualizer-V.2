# Getting the animation frames

1. Each window has an assigned sorting algortihm which returns an array of frames
    - ## Shape of a frame:
    {
        type: string = change-color | invert-color | change-height,
        value1: number,
        value2: number
    }
    - If the type of the frame is change-color or invert-color, value1 and value2 are the indeces of the bars to animate their color. 
    - else if the type is change-height, value1 will be the index and value2 is the height at which bar's height on that index will be over written.

2. During the algortihm, each comparison and writing operations will be pushed on the array of frames in a form of a **Frame**.

3. After the algorthm has been finished, it will then return the array or the animation frames

# Animating each animation frames from the algorithms

1. Since we can have more than 1 windows, we will have an array of animation frames which is an *array of arrays*. 

2. We will then create an array of set intervals for each animation frames.
    ## The shape of intervals
    - intervals = [
        {
            currentFramePosition: number, // index of animation frames array
            interval: setInterval(() => {
                // logic for animation
            }, 1100 - (speed * 100))
        }
    ]

3. Pausing and resuming the animations
    - To pause the animation we just have to traverse the intervals array and clear the setintervals. But we can't resume the animations anymore.
    - To Resume the animations, we need to create the logic of storing the current index position of the array in a variable inside the setInterval. That way we can lookback and set the intervals again starting from the cached position.

*My worry is how this logic will perform. The cost depends on the array size and number of windows.*