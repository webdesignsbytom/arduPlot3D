# Polygon-fullstack

Create shapes and save to a database

Project name: Polygon Cutter

Current Address [Live Polygon Cutter Link](https://main--velvety-blini-fa7e84.netlify.app/)

## Table of contents

- [Polygon-fullstack](#polygon-fullstack)
  - [Table of contents](#table-of-contents)
  - [General info](#general-info)
  - [Technologies](#technologies)
  - [Run this project locally](#run-this-project-locally)
  - [Testing](#testing)

## General info

Using canvas and useRed we can plot the points that a user makes one the screen.
These points can always be manipulated later.
The points can be saved to a users database.

![](https://github.com/webdesignsbytom/Polygon-fullstack/blob/main/assets/gif/polygon_gif.gif?raw=true)

<img src='./assets/images/polygon_home.png' alt='home page' style='width: 300px; height: 200px;' />

Server deployment with Vercel @ [https://polygon-fullstack.vercel.app/](https://polygon-fullstack.vercel.app/)

## Technologies

App developed with:

Frontend: React, JavaScript, Tailwind, Axios, validator

Backend: Express, Prisma, JavaScript

## Run this project locally

1. Fork this repository and clone the fork to your machine.
2. Navigate to client and server files and run
3. `npm install`
4. `npm start`

## Testing

API tests run through Insomnia testing suit.
Check server dir for test files.

http://localhost:4000/users/all-users
http://localhost:4000/users/post-score
{
	"username": "newmae",
	"score": 121
}


{displayDataPoints && index === displayDataPointsIndex && (
              <div>
                {simulationData.simulationLoops[
                  index
                ].mainSimulationLoopDataPoints.map((dataPoint, index) => {
                  return (
                    <div
                      key={index}
                      className='grid grid-cols-a1a h-[30px] w-full gap-2'
                    >
                      <div className='grid items-center justify-center w-[30px] bg-slate-300 h-full outline outline-2 outline-black px-2'>
                        <label
                          htmlFor='loop'
                          className='h-full grid items-center justify-center'
                        >
                          {index + 1}
                        </label>
                      </div>

                      <div className='grid bg-white grid-flow-col items-center px-1 gap-2 w-full h-full outline-black outline outline-2 cursor-pointer hover:bg-yellow-200'>
                        {dataPoint.type}
                      </div>
                      {/* Delete button */}
                      <div className='grid'>
                        <button
                          id='delete_loop'
                          onClick={(event) =>
                            deleteLoopDataPoint(event, dataPoint)
                          }
                          className='active:scale-95 no__highlights rounded-xl'
                        >
                          <IoCloseCircleSharp />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}