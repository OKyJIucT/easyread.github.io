export default {
  methods: {
    makeArrayWithLineBreaksAndDots(text) {
      return text
        .replace(/\s\s+/g, ' <br> <br> ')
        .replace(/\n/g, ' <br> ')
        .replace(/\./g, ' .')
        .replace(/\\,/g, ' ,')
        .split(' ')
    },
    makeArrayWithSentencesAndLineBreaks(text) {
      return text
        .replace(/\s\s+/g, '<br>$#<br>$#')
        .replace(/\n/g, '<br>$#')
        .replace(/\./g, '.$#')
        .split('$#')
    }
  }
}
