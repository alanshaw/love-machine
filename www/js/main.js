!function () {
  var heart = document.getElementById("heart")
  heart.style.height = (window.innerHeight - 20) + "px"

  var fontSize = parseFloat(getComputedStyle(heart, null).getPropertyValue("font-size"))

  function isOverflowed (el) {
    return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth
  }

  function reflow () {
    while (isOverflowed(heart)) {
      fontSize -= 0.2
      heart.style.fontSize = fontSize + "px"
    }
  }

  function spin () {
    heart.className = heart.className ? "" : "spin"
  }

  var tweets = [
    "@dave: Northern Ontario man kills 60-pound lynx with bare hands to save his dogs: http://bit.ly/1hQ7XzO  pic.twitter.com/myRP8pC8Ef",
    "@bob_qillin: Grab a bargain! Get the HTC One & save £170. Now £49.99 upfront at £27 p/m. Ends 8th Jan. #lizzyalanwedding",
    "@jeff_po: @jacobian so, the solution is to not promote the concept and equality will be naturally emergent? (Seriously asking)"
  ]
  var tIndex = 0

  var addTweet = document.getElementById("tweet")

  addTweet.addEventListener("click", function () {
    var tweet = tweets[tIndex]

    if (!tweet) {
      tIndex = 0
      tweet = tweets[0]
    } else {
      tIndex++
    }

    spin()

    // Add the text exactly half way through the spin
    setTimeout(function () {

      // Buggy shape-inside implementation doesn't work if we append a node (2013-12-31)
      heart.innerHTML = heart.innerHTML + " <span class=\"new\">" + tweet + "</span>"

      reflow()

      // Allow CSS to transition the tweet in the next tick
      setTimeout(function () {
        var tweets = document.getElementsByClassName("new")
        for (var i = 0; i < tweets.length; ++i) {
          tweets[i].className = ""
        }
      }, 0)

    }, 400)

  })

}()