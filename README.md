# [Graph Share](https://graphshare.herokuapp.com/#/)

![Logo](README_assets/icon.png)

Graph Share is a full stack web application inspired by Chart.io. The website allows users to upload, create, share and dgiscover charts.

![Feed Page](README_assets/feed_page.png)

## Technologies

The backend is written in [Ruby on Rails](http://rubyonrails.org/) using a PostrgreSQL database for rapid developement and flexibility. 

The frontend is written with [React](https://reactjs.org/) and uses [Redux](https://redux.js.org/). React was chosen to create a dynamic single page application and redux for consistent behaviour and easier debugging.

The charts are built using [D3Js](https://d3js.org/) and SVG. D3 with SVG, although more complex than ready built libraries, provides complete control over the chart look.

The draggable components are built on [React DnD](http://react-dnd.github.io/react-dnd/)


## Features

### Uploading data
You can upload JSON, CSV and TSV data on the website. The parser will attempt to assign a type to each column between Categorical, Numerical or Date. The Date category has a subtype to parse the correct format.

![Data Upload](README_assets/data_upload.gif)

### Creating Charts
You can then use these datasets to create charts. You first chose a chart type between Line Chart, Bar Chart or Area Chart. Then, you can select a dataset among the ones you uploaded. By dragging and dropping on two axes, you can dynamically modiy your chart.

![Chart Creator Demo](README_assets/chart_creator.gif)

### Sharing creations with the world
When you are done and proud of your chart or your newly uploaded dataset. You can share it with the community by writing a new post. The other users will then be able to like your post to validate your awesomeness.

![New Post](README_assets/new_post.png)

## Challenges

### Storing charts
Storing charts was a challenge. The first step was to store data types so that the parser has to work only once. In the future, users should be able to force a type which is only possible if the data is not parse each time the chart is loaded. The second step was to create the right chart by looking at the API response. To do this, I created a Chart Factory which serves the right JSX based on the chart type.

Chart factory pattern
```javascript
class ChartFactory {
  static build(chart, width, height) {
    switch (chart.chart_type) {
      case ChartType.LINE:
        return <LineChart data={convertData(chart.data)} width={width} height={height} />;
      case ChartType.BAR:
        return <BarChart data={convertData(chart.data)} width={width} height={height} />;
      case ChartType.AREA:
        return <AreaChart data={convertData(chart.data)} width={width} height={height} />;
      default:
        return <div className="empty-chart" />;
    }
  }
}

```

### Mixing D3 and React
D3 is usually manipulating the dom in order to create charts. However, React generates a virtual DOM and should be responsible for modifying it. To ensure that no conflict would arise, I used D3 to calculate the position and generate the coordinates but React to create the components. Only one exception was made for creating the axis as D3 needs access to the DOM. For example, the line of the line chart is generated by D3 and rendered by React as follows:

```javascript

// D3 is used to calculate the scales in a scale.js file
const [scaleX, scaleY] = Scale(rows, width, height);

// D3 is used to generate the coordinates of a line using the scales
const lineFunction = line()
    .x(d => scaleX(d[xAxis]))
    .y(d => scaleY(d[columName]));

// React creates a SVG path that will be renderred in a component
const path = <path d={lineFunction(rows)} transform={`translate(${marginLeft}, 0)`} className={`color-stroke-${idx + 1}`} />;

```

### Making the website user friendly
Initial testing revealed that users would not understand that they should drag and drop or how many columns they could drop on the x axis. To make the website more user friendly, I took the following steps:
1. Indicate the steps needed to create the chart

![steps](README_assets/steps.png)

2. Add an icon on the column names to indicate drag and drop

![draggable](README_assets/draggable.png)

3. Visual clue to indicate whether a data column can be dropp on an axis

![drag_green](README_assets/drag_green.png)

## What's next?
- Add additional chart types
- Allow users to force the type of columns and input a date format
- Add comments to the feed