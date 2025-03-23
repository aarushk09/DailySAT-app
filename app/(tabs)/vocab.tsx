import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions, 
  SafeAreaView 
} from "react-native";
import VocabWords from './vocab.json'; // Ensure this path points to your vocab JSON file

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const Vocab: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentWord, setCurrentWord] = useState<any | null>(null);
  const [options, setOptions] = useState<Array<{ key: string, description: string, isCorrect: boolean }>>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  // Function to get a random word
  const getRandomWord = () => {
    if (!VocabWords || !Array.isArray(VocabWords) || VocabWords.length === 0) {
      setError("No vocabulary words available in the dataset");
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * VocabWords.length);
    return VocabWords[randomIndex];
  };

  // Function to get random wrong descriptions
  const getRandomWrongDescriptions = (correctWord: any, numberOfOptions: number = 3) => {
    if (!VocabWords || !Array.isArray(VocabWords) || VocabWords.length < numberOfOptions + 1) {
      setError("Not enough vocabulary words for options");
      return [];
    }
    
    let wrongDescriptions = [];
    let usedIndices = new Set([VocabWords.findIndex(word => word.word === correctWord.word)]);
    
    while (wrongDescriptions.length < numberOfOptions) {
      const randomIndex = Math.floor(Math.random() * VocabWords.length);
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        wrongDescriptions.push(VocabWords[randomIndex].sentence);
      }
    }
    
    return wrongDescriptions;
  };

  const createOptions = (word: any) => {
    if (!word) return [];
    
    const wrongDescriptions = getRandomWrongDescriptions(word);
    
    // Combine correct and wrong descriptions
    let allOptions = [
      { key: "A", description: word.sentence, isCorrect: true },
      { key: "B", description: wrongDescriptions[0], isCorrect: false },
      { key: "C", description: wrongDescriptions[1], isCorrect: false },
      { key: "D", description: wrongDescriptions[2], isCorrect: false },
    ];
    
    // Shuffle options
    return allOptions.sort(() => Math.random() - 0.5);
  };

  const loadWord = () => {
    setLoading(true);
    setShowAnswer(false);
    setSelectedOption(null);
    
    try {
      const word = getRandomWord();
      if (word) {
        setCurrentWord(word);
        setOptions(createOptions(word));
        setLoading(false);
      } else {
        setError("Failed to load a vocabulary word");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error loading vocabulary word:", err);
      setError("Failed to load vocabulary data");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWord();
  }, []);

  const handleOptionSelect = (key: string) => {
    setSelectedOption(key);
  };

  const handleCheckAnswer = () => {
    setShowAnswer(true);
  };

  const handleNextWord = () => {
    loadWord();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading vocabulary...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadWord}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          {currentWord ? (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>Vocabulary Practice</Text>
                <View style={styles.difficultyBadge}>
                  <Text style={styles.difficultyText}>SAT</Text>
                </View>
              </View>

              {/* Word */}
              <View style={styles.wordContainer}>
                <Text style={styles.wordTitle}>Word:</Text>
                <Text style={styles.word}>{currentWord.word}</Text>
              </View>

              {/* Question */}
              <View style={styles.questionContainer}>
                <Text style={styles.question}>
                  Which of the following correctly defines this word?
                </Text>
              </View>

              {/* Answer Choices */}
              <View style={styles.optionsContainer}>
                {options.map((option) => (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      styles.optionButton,
                      selectedOption === option.key && styles.selectedOption,
                      showAnswer && 
                        option.isCorrect && 
                        styles.correctOption,
                      showAnswer && 
                        selectedOption === option.key && 
                        !option.isCorrect && 
                        styles.incorrectOption
                    ]}
                    onPress={() => handleOptionSelect(option.key)}
                    disabled={showAnswer}
                  >
                    <Text style={styles.optionKey}>{option.key}</Text>
                    <Text style={styles.optionText}>{option.description}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Example Usage */}
              {showAnswer && (
                <View style={styles.explanationContainer}>
                  <Text style={styles.explanationTitle}>Definition:</Text>
                  <Text style={styles.explanation}>
                    {currentWord.sentence}
                  </Text>
                </View>
              )}

              <View style={styles.buttonsContainer}>
                {!showAnswer ? (
                  <TouchableOpacity
                    style={[styles.button, !selectedOption && styles.buttonDisabled]}
                    onPress={handleCheckAnswer}
                    disabled={!selectedOption}
                  >
                    <Text style={styles.buttonText}>Check Answer</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleNextWord}
                  >
                    <Text style={styles.buttonText}>Next Word</Text>
                  </TouchableOpacity>
                )}
              </View>
            </>
          ) : (
            <View style={styles.noQuestionsContainer}>
              <Text style={styles.noQuestionsText}>
                No vocabulary words available.
              </Text>
              <TouchableOpacity style={styles.button} onPress={loadWord}>
                <Text style={styles.buttonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f8fa",
  },
  scrollView: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.75,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#3498db",
  },
  container: {
    minHeight: height * 0.75,
    width: width,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#3498db",
  },
  difficultyText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  wordContainer: {
    backgroundColor: "#3498db",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  wordTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  word: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  questionContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  question: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 26,
    color: "#2c3e50",
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    alignItems: "flex-start",
  },
  selectedOption: {
    backgroundColor: "#e1f0ff",
    borderColor: "#3498db",
    borderWidth: 1,
  },
  correctOption: {
    backgroundColor: "#d4edda",
    borderColor: "#28a745",
    borderWidth: 1,
  },
  incorrectOption: {
    backgroundColor: "#f8d7da",
    borderColor: "#dc3545",
    borderWidth: 1,
  },
  optionKey: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    lineHeight: 30,
    marginRight: 15,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  optionText: {
    fontSize: 16,
    color: "#2c3e50",
    flex: 1,
  },
  explanationContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#3498db",
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2c3e50",
  },
  explanation: {
    fontSize: 16,
    lineHeight: 24,
    color: "#2c3e50",
  },
  buttonsContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: "#b2d3ea",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  retryButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
  },
  noQuestionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noQuestionsText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  errorText: {
    color: "#dc3545",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Vocab;