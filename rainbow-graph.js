var RainbowGraph = React.createClass({
  getInitialState: function() {
    return {fgArc: '', midArc: ''};
  },

  animation: function() {
    var steps = 75;
    var runs = 0;
    var interval = setInterval(function(){
        runs += 1;
        if (runs > steps) {
          clearInterval(interval);
          return;
        } else {
          var fgEndAngle = (runs * this.props.data.percent / steps - 0.5) * Math.PI;
          var fgArc = this.arc({endAngle: fgEndAngle});
          var midArc = this.arc({endAngle: fgEndAngle + 0.04});
          this.setState({fgArc: fgArc, midArc: midArc});
        }
    }.bind(this), 8);
  },


  componentDidMount: function() {
    this.animation();
  },

  render: function() {
    var width = this.props.data.width;
    var height = this.props.data.height;
    var transform = "translate(" + width/2 + "," + height + ")";
    var outerRadius = Math.min(height, width/2);
    var innerRadius = outerRadius - this.props.data.arcWidth;
    var startAngle = -0.5 * Math.PI;
    this.arc = d3.arc()
          .startAngle(startAngle)
          .innerRadius(innerRadius)
          .outerRadius(outerRadius);

    var bgArc = this.arc({endAngle: 0.5*Math.PI});

    return (
      <svg width={width} height={height}>
        <g transform={transform}>
          <path d={bgArc} style={{fill: this.props.data.bgColor}}></path>
          <path d={this.state.midArc} style={{fill: this.props.data.midColor}}></path>
          <path d={this.state.fgArc} style={{fill: this.props.data.fgColor}}></path>
        </g>
      </svg>
    );
  }
});

var rainbowGraphs = document.querySelectorAll("[data-rainbow-graph]");
var i = 0;
for (i=0; i<rainbowGraphs.length; i++) {
  var data = {
    width: 150,
    height: 75,
    bgColor: "grey",
    midColor: "white",
    fgColor: "#4CAF50",
    arcWidth: 8,
    percent: 0
  };
  var attributes = JSON.parse(rainbowGraphs[i].getAttribute("data-rainbow-graph"));
  for (var key in attributes) {
    if (data.hasOwnProperty(key)) {
      data[key] = attributes[key];
    }
  }
  ReactDOM.render(
    <RainbowGraph data={data}/>,
    rainbowGraphs[i]
  );
}
